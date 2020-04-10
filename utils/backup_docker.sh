#!/bin/bash
argcount=3
function showHelp {
        echo "use: ./utils/backup_docker.sh BACKUP_PATH DB_NAME CONTAINER_ID"
        echo "example: ./utils/backup_docker.sh data bonsai fa4a8a9f77be"
}

if [ "$#" -ne $argcount ]; then
    echo "Illegal number of parameters"
    showHelp;
    exit 1;
fi
origen=$1
dbName=$2
container=$3
dirBackup=bk_$(date +%Y%m%d_%H%M%S)
docker exec $container rm -rf /tmp/$dirBackup
docker exec $container mkdir -p /tmp/$dirBackup
docker exec $container mongodump --out /tmp/$dirBackup --db $dbName --host localhost
docker cp $container:/tmp/$dirBackup $origen
docker exec $container rm -rf /tmp/$dirBackup
