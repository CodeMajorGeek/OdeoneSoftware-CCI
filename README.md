# Installation sur le serveur de production

Ce document détaille les étapes nécessaires pour installer et déployer le projet **OdeoneSoftware-CCI** sur un serveur Ubuntu en utilisant Docker Compose.

---

## Prérequis

- Serveur Ubuntu à jour
- Accès SSH avec les droits administrateurs (sudo)
- Internet pour télécharger les dépendances

---

## Étapes d'installation

### 1. Installer Docker

1. Mettre à jour le système :
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```
2. Installer Docker en suivant les étapes officielles :
   ```bash
   for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt remove $pkg; done
   sudo apt update
   sudo apt install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```
3. Configurer Docker pour fonctionner sans `sudo` :
   ```bash
   sudo groupadd docker
   sudo usermod -aG docker $USER
   newgrp docker
   ```
   Vérifiez que Docker fonctionne sans `sudo` :
   ```bash
   docker run hello-world
   ```

---

### 2. Installer Buildpacks CLI

1. Installer les dépendances :
   ```bash
   sudo apt install -y software-properties-common
   ```
2. Ajouter le dépôt Buildpacks :
   ```bash
   sudo add-apt-repository ppa:cncf-buildpacks/pack-cli
   sudo apt update
   ```
3. Installer le CLI :
   ```bash
   sudo apt install -y pack-cli
   ```
4. Configurer le builder par défaut :
   ```bash
   pack config default-builder heroku/builder:24
   ```

---

### 3. Installer Git

Installez Git pour cloner le dépôt :
```bash
sudo apt install -y git
```

---

### 4. Installer node.js
Installer Node.js pour générer des clés secrètes :
```bash
sudo apt install -y node
```

---

### 5. Cloner le dépôt

1. Cloner le dépôt du projet :
   ```bash
   git clone https://github.com/CodeMajorGeek/OdeoneSoftware-CCI.git
   ```
2. Aller dans le répertoire du projet :
   ```bash
   cd OdeoneSoftware-CCI
   ```

---

### 6. Préparer le build React

1. Démarrer les conteneurs pour le build React :
   ```bash
   docker compose up -d
   ```
2. Construire les fichiers statiques de React :
   ```bash
   docker exec -it react_front bash
   npm run build
   exit
   ```
3. Arrêter les conteneurs :
   ```bash
   docker compose down
   ```

---

### 7. Configurer les tokens secrets

1. Générer deux tokens secrets à l'aide de Node.js :
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. Répétez cette commande pour générer un second token.

3. Renommer et compléter le .env
   ```bash
    mv ./express-back/.env.example ./express-back/.env
    nano ./express-back/.env
   ```

---

### 8. Construire les images front et back

1. Construire l'image Frontend :
   ```bash
   pack build odeone_front --path ./react-front/build/.
   ```
2. Construire l'image Backend :
   ```bash
   pack build odeone_back --path ./express-back/.
   ```

---

### 9. Passer au fichier Docker Compose de production

Renommer les fichiers de configuration Docker Compose :
```bash
mv docker-compose.yml docker-compose.dev
mv docker-compose.build docker-compose.yml
```

---

### 10. Lancer le projet en mode détaché

Démarrer les services en arrière-plan :
```bash
docker compose up -d
```

---

## Notes supplémentaires

- Pour vérifier que les conteneurs fonctionnent correctement :
  ```bash
  docker ps
  ```
- Pour visualiser les logs des services :
  ```bash
  docker compose logs -f
  ```

--- 

## Auteur
**Théo Colinmaire**  
[GitHub Repository](https://github.com/CodeMajorGeek/OdeoneSoftware-CCI)