# Puya Starter

Starter implementation of smart contract using Algorand Python.

## requirements

- algokit >= version 2.0.3
- python >= 3.12.3
- node >= v20.12.2
- puyapy >= 2.2.0

## commands

### build all using algokit
```shell
algokit compile py contract.py
algokit generate client Base.arc32.json --language typescript --output BaseClient.ts
algokit generate client Base.arc32.json --language python --output BaseClient.py
```

### build and run script
```shell
(docker run -v $(pwd):/src -v $(pwd)/artifacts:/artifacts algokit-builder; cp -v artifacts/BaseClient.ts ./scripts/; (cd scripts/ && npx tsc && node deploy.js))
```


### build all using docker

```shell
docker build . -t algokit-builder
```
 
```shell
docker run -v $(pwd):/src -v $(pwd)/artifacts:/artifacts algokit-builder
```
