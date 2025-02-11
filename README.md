
# Cinema Reservation

## Description

Ce projet est un site web de réservation de places de cinéma. Il est composé de trois services :

- Users : gestion des utilisateurs
- Movies : gestion des films
- Sessions : gestion des séances

## Installation

```bash
# Cloner le dépôt
echo "Clonage du dépôt..."
git clone https://github.com/raphael-pietrzak/cinema-reservation-YNOV.git
cd cinema-reservation-YNOV || exit

# Lancer le frontend
echo "Installation et lancement du frontend..."
cd frontend || exit
npm install
npm start &
cd ..

# Lancer le service Users
echo "Installation et lancement du service Users..."
cd API/Users || exit
npm install
npm start &
cd ../..

# Lancer le service Movies
echo "Installation et lancement du service Movies..."
cd API/Movies || exit
npm install
npm start &
cd ../..

# Lancer le service Sessions
echo "Installation de l'environnement virtuel et lancement du service Sessions..."
cd API/Sessions || exit
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 cinema_service/manage.py runserver &
cd ../..

echo "Tous les services ont été lancés !"
```
