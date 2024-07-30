# Puya Starter

Starter implementation of smart contract using Algorand Python.

## requirements

- algokit >= version 2.0.3
- python >= 3.12.3
- node >= v20.12.2

## commands

### build all using algokit
```shell
algokit compile py contract.py
algokit generate client Base.arc32.json --language typescript --output BaseClient.ts
algokit generate client Base.arc32.json --language python --output BaseClient.py
```

### build all using docker

```shell
docker build . -t algokit-builder
```
 
```shell
docker run -v $(pwd):/src -v $(pwd)/artifacts:/artifacts algokit-builder
```