<?php
class User
{
    private static $keys='id,username,password,color';

    /* Les attributs de notre objet (ie le colonne en base) */
    private static function getKeys()
    {
        return explode(',', self::$keys);
    }

    /* Converti un tableau associatif en User */
    public static function hydrate($data)
    {
        $user = new User();
        foreach (self::getKeys() as $key) {
            if (isset($data[$key])) {
                $user->{$key} = $data[$key];
            }
        }

        return $user;
    }

    /* Recherche un user dans la bdd */
    public static function getUserByName($username)
    {
        $query = 'SELECT * FROM `user` WHERE `username` = ?';
        $stmt = DB::$pdo->prepare($query);
        $stmt->execute([$username]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }
        return USER::hydrate($row);
    }

    /*
     * Sauvegarde de l'objet en cours en bdd
     * idéalement il faudrait une méthode `createUser` pour un nouvel utilisateur
     * et une méthode `updateUser` pour mettre à jour
     * save pourrai alors dispatcher entre les deux selon la présence d'un id.
     * si l'id est défini, l'utilisateur existe en bdd et on le met à jour
     * Sinon l'utilisateur n'existe pas et il faut le créé.
     */
    public function save()
    {
        $query = 'INSERT INTO `user` (username, password, color) VALUES (?, ?, ?)';
        $stmt = DB::$pdo->prepare($query);
        $done =  $stmt->execute([
            $this->username,
            password_hash($this->password, PASSWORD_DEFAULT),
            $this->color
        ]);

        return $done ? DB::$pdo->lastInsertId() : false;
    }

    /* Vérification du mot de passe */
    public function checkPassword($password)
    {
        return password_verify($password, $this->password);
    }
}
