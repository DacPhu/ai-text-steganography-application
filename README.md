# Production settings

## Start Application

```shell
  docker-compose up --build -d
```

# Development Settings

## Execute client application

### Navigate to source directory

```shell
  cd back-end
```

### Install require packages

```shell
  npm install --save-dev
```

### Run client application

```shell
  npm run dev
```

## Execute server application

### Navigate to source directory

```shell
  cd back-end
```

### Install require packages

```shell
  npm install --save-dev
```

### Create asymmetrical keys

```shell
  openssl genrsa -out jwt.key 2048;
  openssl rsa -in jwt.key -pubout -out jwt.key.pub
```

### Migrate database schema

```shell
  npm run db
```

### Run server application

```shell
  npm run dev
```

## Execute Server Model

### Create new virtual environment

```shell
  conda create -n "ai-text-steganography"
```

### Activate virtual environment

```shell
  conda activate ai-text-steganography
```

### Install require packages

```shell
  pip install -r requirements.txt
```

### Run FastAPI

```shell
  python api.py
```

# References

https://github.com/trnKhanh/ai-text-steganography
