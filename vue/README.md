# node-chat

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Docker

```
cp .env .env.local
```

```
docker build -t vue-chat .
```

```
docker run -it -p 8080:8080 vue-chat
```