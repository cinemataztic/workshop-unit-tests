const fs = require("fs");
const http = require("http");
const path = require("path");
const { exec } = require("child_process");

const PORT = 3300;
const PUBLIC_DIR = path.join(__dirname, "../public");

const LOG_FILE = path.join(PUBLIC_DIR, "logs.txt");
const WINNER_FILE = path.join(PUBLIC_DIR, "winner.txt");

// Function to clear files at the start
function clearFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "", "utf8"); // Overwrite with an empty string
    }
}

// Clear logs and winner file at the start
clearFile(LOG_FILE);
clearFile(WINNER_FILE);

// Function to open the animation page in a browser
function openHTMLPage() {
    const filePath = path.join(PUBLIC_DIR, "animation.html");

    // Platform-specific browser open command
    const openCommand = process.platform === "win32"
        ? `start ${filePath}`   // Windows
        : process.platform === "darwin"
        ? `open ${filePath}`     // macOS
        : `xdg-open ${filePath}`; // Linux

    exec(openCommand, (error) => {
        if (error) {
            console.error("Failed to open animation.html:", error);
        } else {
            console.log("Opened animation.html successfully.");
        }
    });
}

// Function to log to file instead of console
function logToFile(message) {
    fs.appendFileSync(LOG_FILE, message + "\n", "utf8");
}

// Function to write the winner details
function writeWinner(winnerName) {
    if (players.length >= 2) {
        const output = `${players[0].name}\n${players[1].name}\n${winnerName}\n`;
        fs.writeFileSync(WINNER_FILE, output, "utf8");
    }
}

const args = process.argv;
const players = [];

function addPlayer(name) {
    const player = {
        name: name,
        actions: null,
    };

    if (!name) {
        console.error("Error: No player specified.");
        return;
    }

    const playerModulePath = path.join(__dirname, "../players", `${name}.js`);

    try {
        player.actions = require(playerModulePath);
        players.push(player);
    } catch (error) {
        console.error(`Error loading player type '${name}':`, error.message);
    }
}

function compete() {
    for (const name of args.slice(2)) {
        addPlayer(name);
    }

    shufflePlayers(players);

    logToFile(`${players[0].name} draws their weapon first, ${players[1].name} draws second!\n`);

    let coOridinatesPlayer1 = { x: -99, y: -99, shoot: false };
    let coOridinatesPlayer2 = { x: -99, y: -99, shoot: false };

    for (let i = 0; i < 500; i++) {
        let windX = Math.floor(Math.random() * 3) + 1;
        let windY = Math.floor(Math.random() * 3) - 1;

        coOridinatesPlayer1.x += windX;
        coOridinatesPlayer1.y += windY;
        coOridinatesPlayer2.x += windX;
        coOridinatesPlayer2.y += windY;

        coOridinatesPlayer1 = players[0].actions.aim(coOridinatesPlayer1.x, coOridinatesPlayer1.y);
        coOridinatesPlayer2 = players[1].actions.aim(coOridinatesPlayer2.x, coOridinatesPlayer2.y);

        logToFile(
            `${players[0].name} moves to {${coOridinatesPlayer1.x}, ${coOridinatesPlayer1.y}}, ` +
            `${players[1].name} moves to {${coOridinatesPlayer2.x}, ${coOridinatesPlayer2.y}}\n`
        );

        let result = checkForShoot(coOridinatesPlayer1, coOridinatesPlayer2);
        if (result) break;
    }
}

function checkForShoot(coOridinatesPlayer1, coOridinatesPlayer2) {
    if (coOridinatesPlayer1.shoot) {
        if (coOridinatesPlayer1.x === 0 && coOridinatesPlayer1.y === 50) {
            let winnerMessage = `${players[0].name} shoots and wins!`;
            logToFile(winnerMessage);
            writeWinner(players[0].name);
            return true;
        } else {
            coOridinatesPlayer1.x -= 20;
            coOridinatesPlayer2.y -= 20;
        }
    }

    if (coOridinatesPlayer2.shoot) {
        if (coOridinatesPlayer2.x === 0 && coOridinatesPlayer2.y === 50) {
            let winnerMessage = `${players[1].name} shoots and wins!`;
            logToFile(winnerMessage);
            writeWinner(players[1].name);
            return true;
        } else {
            coOridinatesPlayer2.x -= 20;
            coOridinatesPlayer2.y -= 20;
        }
    }

    return false;
}

function shufflePlayers(players) {
    return players.sort(() => Math.random() - 0.5);
}

// Start the competition
compete();

// Create an HTTP server to serve files from /public
const server = http.createServer((req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === "/" ? "animation.html" : req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }

        // Set content type
        const ext = path.extname(filePath);
        let contentType = "text/plain";
        if (ext === ".html") contentType = "text/html";
        if (ext === ".txt") contentType = "text/plain";
        if (ext === ".css") contentType = "text/css";
        if (ext === ".js") contentType = "application/javascript";

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

setTimeout(()=> {
    // Start server
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        exec(`open http://localhost:${PORT}`);
    });
}, 3000)

module.exports = { addPlayer, shufflePlayers, players };
