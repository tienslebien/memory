<?php

class DB
{
    public static $pdo;

    public static function connect($host, $user, $pass, $base)
    {
        try {
            // Essayons de nous connecter
            $db = new PDO("mysql:host=$host;charset=utf8", $user, $pass);

            // Recherchons si notre bdd existe pour la créé si besoin
            $database = $db->prepare('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?');
            $database->execute(array($base));

            if (count($database->fetchAll()) === 0) {
                self::initDB($db, $base);
            } else {
                $db->exec("use `$base`;");
            }

            self::$pdo = $db;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    /* Création de la base de données et des tables */
    private static function initDB($db, $base)
    {
        $query = "CREATE DATABASE `$base` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";
        $db->exec($query);

        $query = "use `$base`;";
        $db->exec($query);

        $query = <<<EOT
    CREATE TABLE `user` (
        `id` int(10) UNSIGNED NOT NULL auto_increment,
        `username` varchar(10) NOT NULL,
        `password` varchar(255) NOT NULL,
        `color` varchar(7) NOT NULL DEFAULT '000000',
        PRIMARY KEY (`id`),
        UNIQUE KEY (`username`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
EOT;
        $db->exec($query);

        $query = <<<EOT
    CREATE TABLE `score` (
        `id` int(10) UNSIGNED NOT NULL auto_increment,
        `user` int(10) UNSIGNED NOT NULL,
        `time` int(10) UNSIGNED NOT NULL,
        `date` date NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`),
        FOREIGN KEY (`user`) REFERENCES `user` (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8; 
EOT;
        $db->exec($query);
    }
}

DB::connect($DB_HOST, $DB_USER, $DB_PASS, $DB_BASE);
