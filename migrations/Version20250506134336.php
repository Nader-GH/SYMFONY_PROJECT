<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250506134336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE product ADD condition_0_id INT DEFAULT NULL, ADD category_0_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE product ADD CONSTRAINT FK_D34A04ADFA9B6EBE FOREIGN KEY (condition_0_id) REFERENCES `condition` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE product ADD CONSTRAINT FK_D34A04ADC3F441D8 FOREIGN KEY (category_0_id) REFERENCES category (id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_D34A04ADFA9B6EBE ON product (condition_0_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_D34A04ADC3F441D8 ON product (category_0_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADFA9B6EBE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADC3F441D8
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_D34A04ADFA9B6EBE ON product
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_D34A04ADC3F441D8 ON product
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE product DROP condition_0_id, DROP category_0_id
        SQL);
    }
}
