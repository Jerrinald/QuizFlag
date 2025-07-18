<?php

namespace App\Service;

use Exception;
use App\Entity\User;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Configuration;
use GuzzleHttp\Client;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;

class EmailService
{
    private string $sendinblueApiKey;

    public function __construct(string $sendinblueApiKey)
    {
        $this->sendinblueApiKey = $sendinblueApiKey;
    }

    public function sendVerificationEmail($destinator, $subject, $htmlContent): void
    {
        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', $this->sendinblueApiKey);

        $apiInstance = new TransactionalEmailsApi(new Client(['verify' => false]), $config);

        $sendSmtpEmail = new \Brevo\Client\Model\SendSmtpEmail();
        $sendSmtpEmail['to'] = [['email' => $destinator]];
        $sendSmtpEmail['sender'] = ['name' => 'FlagQuiz Team', 'email' => 'noreply@quizflag.com'];
        $sendSmtpEmail['subject'] = $subject;
        $sendSmtpEmail['htmlContent'] = $htmlContent;
        $sendSmtpEmail['textContent'] = "To reset your password, go to https://yourwebsite.com/reset-pass/";
    
        try {
            $result = $apiInstance->sendTransacEmail($sendSmtpEmail);
        } catch (Exception $e) {
            throw new \RuntimeException('Error sending email: ' . $e->getMessage());
        }
    }
}