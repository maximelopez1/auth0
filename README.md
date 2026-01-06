# Auth0 – Fonctionnement général  
## SPA React + API sécurisée

## Objectif

Ce document décrit simplement le **fonctionnement d’Auth0** dans une application composée de :

- une **Single Page Application (SPA)** en React
- une **API backend**
- Auth0 comme **service d’authentification et d’autorisation**

L’objectif est d’expliquer comment l’authentification est gérée de bout en bout.

---

## Architecture générale

Auth0 est utilisé comme **service central d’authentification** entre le frontend et l’API.

- Le frontend ne gère pas les identifiants utilisateurs
- L’API ne gère pas le login
- Auth0 s’occupe de l’authentification et de la génération des tokens

---

## Rôle de chaque élément

### SPA React
- Affiche l’interface utilisateur
- Redirige l’utilisateur vers Auth0 pour se connecter
- Récupère un **Access Token**
- Envoie ce token à l’API lors des appels sécurisés

### Auth0
- Authentifie l’utilisateur
- Génère des tokens sécurisés (JWT)
- Signe les tokens
- Fournit les clés publiques permettant à l’API de vérifier les tokens

### API
- Expose des endpoints publics et privés
- Vérifie les tokens reçus
- Autorise ou refuse l’accès aux routes protégées

---

## Les tokens Auth0

Auth0 utilise des **JWT (JSON Web Tokens)**.

### ID Token
- Contient les informations utilisateur
- Utilisé uniquement côté frontend
- Ne doit jamais être envoyé à l’API

### Access Token
- Sert à accéder à l’API
- Envoyé dans l’en-tête HTTP `Authorization`
- Vérifié par l’API pour autoriser l’accès

---

## Audience (API cible)

Chaque API déclarée dans Auth0 possède un **Identifier**.

Cet identifier :
- représente l’API
- devient la valeur `aud` dans l’Access Token

L’API accepte uniquement les tokens dont l’audience correspond à son identifier.

---

## Flux d’authentification

1. L’utilisateur ouvre l’application React
2. React redirige l’utilisateur vers Auth0 pour se connecter
3. L’utilisateur s’authentifie sur Auth0
4. Auth0 retourne un Access Token à React
5. React appelle l’API avec ce token
6. L’API vérifie le token et renvoie la réponse

---

## Sécurisation de l’API

Pour chaque requête protégée, l’API vérifie :

- la signature du token
- l’émetteur (Auth0)
- l’audience
- la date d’expiration

Si le token est valide, l’accès est autorisé.

---

## Permissions (scopes)

Les permissions définissent **les actions autorisées pour l’utilisateur**.

- Elles sont définies sur l’API dans Auth0
- Elles sont incluses dans l’Access Token
- L’API peut restreindre certaines routes à des permissions spécifiques

---

## CORS

Dans une architecture SPA + API :
- le frontend et l’API sont sur des origines différentes
- l’API doit autoriser explicitement les requêtes du frontend

Cela inclut l’autorisation de l’en-tête `Authorization`.

---

## Conclusion

Auth0 permet de :
- centraliser l’authentification
- sécuriser les APIs via des tokens
- séparer clairement les responsabilités entre frontend, authentification et backend

Le même fonctionnement s’applique quelle que soit la technologie du backend (Node.js, .NET, etc.).
