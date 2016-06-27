#!/bin/bash

echo "Installing cfssl in GOPATH"
if [ -z $GOPATH ]; then
    mkdir ~/.gopath
    export GOPATH=~/.gopath
    echo "export GOPATH=~/.gopath" >> ~/.bashrc
    echo "export PATH=$PATH:$GOPATH/bin" >> ~/.bashrc
fi

if [ ! -e $GOPATH/bin/cfssl ]; then
    go get -u github.com/cloudflare/cfssl/cmd/cfssl
fi
if [ ! -e $GOPATH/bin/cfssljson ];then
    go get -u github.com/cloudflare/cfssl/cmd/cfssljson
fi

echo "Installing NPM dependencies..."
npm install

mkdir -p conf/CA
cd conf/CA

ROOT_CA_NAME="ROOT CA"

cat > csr_ca.json <<EOF
{
    "CN": "$ROOT_CA_NAME",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "ES",
            "L": "Madrid",
            "O": "UC3M",
            "OU": "Master Ciberseguridad",
            "ST": "Madrid"
        }
    ]
}
EOF

cat csr_ca.json | sed "s/${ROOT_CA_NAME}/$(hostname -f)/g" > csr_server.json

cfssl genkey -initca csr_ca.json | cfssljson -bare ca
cfssl gencert -ca ca.pem -ca-key ca-key.pem -hostname=$(hostname -f) csr_server.json | cfssljson -bare server

rm *.csr
rm csr_*.json

cd -
