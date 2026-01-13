const valorantService = require('../services/valorantService');
const { Match } = require('../models');

const getPlayerStats = async (req, res, next) => {
  try {
    const user = req.user;
    const { UserStats } = require('../models');
    
    if (!user.riotId) {
      return res.status(400).json({
        success: false,
        message: 'Riot ID non configuré. Veuillez ajouter votre Riot ID dans votre profil.'
      });
    }

    const { name, tag } = valorantService.parseRiotId(user.riotId);
    const region = valorantService.determineRegion(user.riotId);

    const [account, mmr] = await Promise.all([
      valorantService.getAccount(name, tag).catch(err => null),
      valorantService.getMMR(region, name, tag).catch(err => null)
    ]);

    if (!account && !mmr) {
      return res.status(404).json({
        success: false,
        message: 'Impossible de récupérer les données Valorant. Vérifiez votre Riot ID.'
      });
    }

    // Sauvegarder ou mettre à jour les stats en base
    if (mmr?.data) {
      const mmrData = mmr.data.current_data || mmr.data;
      await UserStats.upsert({
        userId: user.id,
        currentRank: mmrData.currenttierpatched || 'Unrated',
        rankingInTier: mmrData.ranking_in_tier || 0,
        mmr: mmrData.mmr_change_to_last_game || 0,
        elo: mmrData.elo || 0,
        region: region,
        lastUpdated: new Date()
      });
    }

    res.status(200).json({
      success: true,
      data: {
        account: account?.data || null,
        mmr: mmr?.data?.current_data || mmr?.data || null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération des statistiques'
    });
  }
};

const getMatchHistory = async (req, res, next) => {
  try {
    const user = req.user;
    
    if (!user.riotId) {
      return res.status(400).json({
        success: false,
        message: 'Riot ID non configuré'
      });
    }

    const { name, tag } = valorantService.parseRiotId(user.riotId);
    const region = valorantService.determineRegion(user.riotId);
    const { mode = 'competitive', size = 10 } = req.query;

    const matches = await valorantService.getMatchHistory(region, name, tag, mode, parseInt(size)).catch(err => ({ data: [] }));

    if (matches.data && matches.data.length > 0) {
      for (const match of matches.data) {
        const playerStats = match.players.all_players.find(
          p => p.name === name && p.tag === tag
        );

        if (playerStats) {
          const matchDate = match.metadata.game_start 
            ? new Date(match.metadata.game_start * 1000) // Convertir timestamp Unix en millisecondes
            : new Date();

          const matchData = {
            userId: user.id,
            matchId: match.metadata.matchid,
            gameMode: match.metadata.mode,
            map: match.metadata.map,
            agent: playerStats.character,
            kills: playerStats.stats.kills,
            deaths: playerStats.stats.deaths,
            assists: playerStats.stats.assists,
            score: playerStats.stats.score,
            won: playerStats.team === match.teams.red.has_won ? match.teams.red.has_won : match.teams.blue.has_won,
            roundsWon: playerStats.team === 'Red' ? match.teams.red.rounds_won : match.teams.blue.rounds_won,
            roundsLost: playerStats.team === 'Red' ? match.teams.red.rounds_lost : match.teams.blue.rounds_lost,
            matchDate: matchDate,
            metadata: match
          };

          // Utiliser upsert pour créer ou mettre à jour
          await Match.upsert(matchData);
        }
      }
    }

    res.status(200).json({
      success: true,
      data: matches.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération de l\'historique'
    });
  }
};

const getStoredMatches = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const matches = await Match.findAll({
      where: { userId: req.user.id },
      order: [['matchDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await Match.count({ where: { userId: req.user.id } });

    res.status(200).json({
      success: true,
      data: {
        matches,
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la récupération des matchs'
    });
  }
};

const deleteAllMatches = async (req, res, next) => {
  try {
    await Match.destroy({
      where: { userId: req.user.id }
    });

    res.status(200).json({
      success: true,
      message: 'Tous vos matchs ont été supprimés'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la suppression des matchs'
    });
  }
};

module.exports = {
  getPlayerStats,
  getMatchHistory,
  getStoredMatches,
  deleteAllMatches
};
