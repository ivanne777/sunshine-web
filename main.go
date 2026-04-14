package main

import (
	"fmt"
	"net/http"
	"os"
)

/* =========================
   PAGES PRINCIPALES
========================= */

// Accueil
func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}

// Connexion
func loginHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "login.html")
}

// Beauty Meter
func beautyHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "beauty-meter.html")
}

// Suite
func suiteHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "suite.html")
}

// Questions
func questionHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "questions.html")
}

// Scratch Card
func scratchHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "scratch-card.html")
}

// 100 Reasons
func reasonsHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "reasons.html")
}

// Final Message
func finalMessageHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "final-message.html")
}

// Memories
func memoriesHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "memories.html")
}

// Ancien message
func messageHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "message.html")
}

/* =========================
   MAIN
========================= */

func main() {

	// 📌 ROUTES PAGES
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/beauty", beautyHandler)
	http.HandleFunc("/suite", suiteHandler)
	http.HandleFunc("/question", questionHandler)
	http.HandleFunc("/scratch", scratchHandler)
	http.HandleFunc("/reasons", reasonsHandler)
	http.HandleFunc("/final-message", finalMessageHandler)
	http.HandleFunc("/memories", memoriesHandler)
	http.HandleFunc("/message", messageHandler)

	// 📌 ROUTES JEUX
	http.HandleFunc("/game-balloons", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "balloons-game.html")
	})
	http.HandleFunc("/game-wheel", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "wheel-game.html")
	})
	http.HandleFunc("/game-find-heart", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "find-heart.html")
	})

	// 📌 FICHIERS STATIQUES (CSS, JS, etc.)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("."))))

	// 📌 DOSSIERS (music, assets)
	http.Handle("/music/", http.StripPrefix("/music/", http.FileServer(http.Dir("music"))))
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))

	/* =========================
	   LANCEMENT SERVEUR
	========================= */

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("🔥 Serveur lancé sur le port " + port)

	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		fmt.Println("❌ Erreur :", err)
	}
}