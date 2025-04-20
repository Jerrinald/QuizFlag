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

    public function __construct(string $sendinblueApiKey = '')
    {
        $this->sendinblueApiKey = $sendinblueApiKey;
    }

    public function sendVerificationEmail($destinator, $subject, $htmlContent): void
    {
        dump($this->sendinblueApiKey);
        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', $this->sendinblueApiKey);

        $apiInstance = new TransactionalEmailsApi(new Client(['verify' => false]), $config);

        $sendSmtpEmail = new \Brevo\Client\Model\SendSmtpEmail();
        $sendSmtpEmail['to'] = [['email' => $destinator]];
        $sendSmtpEmail['sender'] = ['name' => 'QuizFlag', 'email' => 'no-reply@quiz-flag.com'];
        $sendSmtpEmail['htmlContent'] = $htmlContent;
        $sendSmtpEmail['subject'] = $subject;
        $sendSmtpEmail['headers'] = array('MIME-version'=>'1.0',
        'Date'=> date('r'), 'From'=> 'Quiz-Flag<no-reply@quiz-flag.com>', 'Reply-To'=> 'Quiz-flag<no-reply@quizflag.com>',
        'Content-Type'=> 'text/html; charset=utf-8', 'X-Mailer'=> 'PHP/'.phpversion());

        try {
            $result = $apiInstance->sendTransacEmail($sendSmtpEmail);
        } catch (Exception $e) {
            throw new \RuntimeException('Error sending email: ' . $e->getMessage());
        }
    }
}