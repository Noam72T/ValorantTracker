-- Migration pour ajouter les champs RGPD au modèle User

-- Ajouter les colonnes de consentement
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "consentGiven" BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS "consentDate" TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS "dataProcessingConsent" BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS "marketingConsent" BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS "deletionRequestedAt" TIMESTAMP WITH TIME ZONE;

-- Ajouter la colonne deletedAt pour le soft delete (paranoid mode)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP WITH TIME ZONE;

-- Créer un index sur deletionRequestedAt pour optimiser la tâche de nettoyage
CREATE INDEX IF NOT EXISTS idx_users_deletion_requested 
ON users("deletionRequestedAt") 
WHERE "deletionRequestedAt" IS NOT NULL;

-- Créer un index sur deletedAt pour le soft delete
CREATE INDEX IF NOT EXISTS idx_users_deleted 
ON users("deletedAt") 
WHERE "deletedAt" IS NOT NULL;

-- Commentaires pour documentation
COMMENT ON COLUMN users."consentGiven" IS 'Consentement général de l''utilisateur';
COMMENT ON COLUMN users."consentDate" IS 'Date du consentement';
COMMENT ON COLUMN users."dataProcessingConsent" IS 'Consentement pour le traitement des données';
COMMENT ON COLUMN users."marketingConsent" IS 'Consentement pour les communications marketing';
COMMENT ON COLUMN users."deletionRequestedAt" IS 'Date de la demande de suppression (suppression effective après 30 jours)';
COMMENT ON COLUMN users."deletedAt" IS 'Date de suppression logique (soft delete)';
