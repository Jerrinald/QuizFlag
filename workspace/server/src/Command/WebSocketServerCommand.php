<?php

namespace App\Command;

use App\Service\WebsocketService;
use Ratchet\MessageComponentInterface; // Ratchet package
use Ratchet\ConnectionInterface; 
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use React\EventLoop\Loop;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:websocket:serveur',
    description: 'Serveur websocket',
)]
class WebSocketServerCommand extends Command Implements MessageComponentInterface
{
    private $connections = [];
    private $timer = 60; // 60 seconds for the quiz
    private $interval;

    public function configure()
    {
        $this->setDescription('Start the WebSocket server.');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $server = IoServer::factory( // Ratchet package
            new HttpServer( // Ratchet package
                new WsServer($this) // Ratchet package
            ),
            8081
        );

        $output->writeln('WebSocket server started on ws://localhost:8081');
        $this->startTimer();
        $server->run(); // Ratchet package

        return Command::SUCCESS;
    }

    public function onOpen(ConnectionInterface $conn) // Ratchet package
    {
        $this->connections[$conn->resourceId] = $conn;
        $this->timer = 60; // Reset timer to 60 seconds
        $conn->send(json_encode(['type' => 'timer', 'time' => $this->timer]));
    }

    public function onMessage(ConnectionInterface $from, $msg) // Ratchet package
    {
        // Handle incoming messages if needed
    }

    public function onClose(ConnectionInterface $conn) // Ratchet package
    {
        unset($this->connections[$conn->resourceId]);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) // Ratchet package
    {
        $conn->close();
    }

    public function startTimer()
    {
        $loop = Loop::get();

        $this->interval = $loop->addPeriodicTimer(1, function() {
            $this->timer--;
            foreach ($this->connections as $conn) {
                $conn->send(json_encode(['type' => 'timer', 'time' => $this->timer]));
            }
            if ($this->timer <= 0) {
                foreach ($this->connections as $conn) {
                    $conn->send(json_encode(['type' => 'timer', 'time' => 0, 'message' => 'Time is up!']));
                }
                $this->timer = 60; // Reset timer for the next connection
            }
        });

        $loop->run(); // ReactPHP loop
    }
}
