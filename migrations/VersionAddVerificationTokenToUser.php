<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class VersionAddVerificationTokenToUser extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add verificationToken field to user table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user ADD verification_token VARCHAR(64) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user DROP verification_token');
    }
}
