<?php

class LoginGateway
{
    private PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function login(string $email, string $password): array
    {
        $userStmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
        //$userStmt->execute([$email]);

        



        $userStmt->bindParam(':email', $email, PDO::PARAM_STR);
        $userStmt->execute();

        $user = $userStmt->fetch(PDO::FETCH_ASSOC);


        if (!$user) {
            return ["error" => "User does not exist"];
        }

        
        if (password_verify(trim($password), $user['upass']) === false) {
            return ["error" => "Incorrect password"];
        }

        // Generate authentication token
        $token = bin2hex(random_bytes(32));

       


        // Return authentication token
        return ["token" => $token];
    }
}
