#!/bin/bash
argcount=6
function showHelp {
        echo "use: ./utils/restore_docker.sh BACKUP_PATH CONTAINER_ID MONGO_HOST"
        echo "example: ./utils/restore_docker.sh data/bk_20200409_200353 fa4a8a9f77be localhost:27017 leo leo admin"
}

if [ "$#" -ne $argcount ]; then
    echo "Illegal number of parameters"
    showHelp;
    exit 1;
fi
origen=$1
container=$2
host=$3
user=$4
pass=$5
authdb=$6
docker exec $container rm -rf /tmp/backup
docker cp $origen $container:/tmp/backup
docker exec $container mongorestore --drop /tmp/backup --host $host -u $user -p $pass --authenticationDatabase $authdb
docker exec $container rm -rf /tmp/backup
