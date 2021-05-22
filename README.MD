## Description

Simple chat app built with node and vue. My programming sandbox to test new syntax.

## Google OAuth client id

https://console.cloud.google.com/apis/credentials

## Running dev environment

1. Edit server env
```
cp node/.env.example node/.env
```
2. Edit client env
```
cp vue/.env vue/.env.local
```

### 3. From docker-compose
```
docker-compose up
```


### 3. Or from files

Dev back (8000)
```
npm --prefix node run build:live
```

Dev front (8080)
```
npm --prefix vue run serve
```

(db from e.g. atlas)