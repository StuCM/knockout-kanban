run:
	@json-server ./data/db.json &
	@npm run dev &
	@xdg-open http://localhost:8080 || open http://localhost:8080 || explorer.exe http://localhost:8080