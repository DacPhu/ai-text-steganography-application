# AI Text Steganography Application

# Introduction

In recent years, the rapid advancement of information technology has brought artificial intelligence (AI) to the forefront of various fields such as healthcare, education, design, and automation. With this growth, several challenges and concerns have emerged, including ethical considerations, privacy issues, job displacement, and the potential for biased or discriminatory decision-making by AI systems.

One of the prominent areas of AI development is in language processing, specifically through the use of large language models (LLMs). These models, like OpenAI’s GPT-4 and Google’s BERT, are designed to understand, generate, and process human language at an advanced level. Unlike computer vision, which is a remarkable AI achievement, language processing is fundamental to human communication. Thus, advancements in LLMs are crucial for bridging the gap between human and machine understanding.

## Steganography vs. Encryption

While encryption ensures data confidentiality by transforming information into an unreadable format, it also signals the presence of protected data, potentially attracting unwanted attention. Steganography, on the other hand, addresses these limitations by embedding messages within seemingly innocuous carrier texts, thus avoiding detection altogether. This approach not only enhances confidentiality but also provides a discreet means to communicate sensitive information securely.

## Application Overview

Our application utilizes steganographic techniques to hide and retrieve messages within text, akin to digital watermarking. Unlike encryption, steganography conceals the very existence of the message within non-secret data. This is particularly valuable for scenarios where confidentiality and discretion are crucial. The application enables the detection and extraction of these hidden messages through specialized algorithms, ensuring both the integrity and confidentiality of the communicated data.

## Use Cases

### Digital Watermarking:

Protect intellectual property by embedding invisible identifiers within digital content.

### Covert Communication:

Securely transmit sensitive information in environments where discretion is paramount.

### Document Authenticity:

Embed signatures or identifiers in documents to verify their authenticity.

By employing these techniques, the application offers practical solutions for industries and individuals seeking to enhance privacy, protect intellectual property, and maintain security in various digital contexts.

# Development Settings

## Execute client application

### Navigate to source directory

```shell
  cd front-end
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

# Production settings (Not available)

## Start Application

```shell
  docker-compose up --build -d
```

# References

https://github.com/trnKhanh/ai-text-steganography
