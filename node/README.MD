```
cp .env.example .env
```

```
docker build -t node-chat .
```

```
docker run -it -p 8000:8000 node-chat
```