#!/bin/bash
argcount=1
function showHelp {
        echo "uso: ./utils/backup.sh BACKUP_PATH DB_NAME"
        echo "ejemplo: ./utils/backup.sh data bonsai"
}

if [ "$#" -ne $argcount ]; then
    echo "Illegal number of parameters"
    showHelp;
    exit 1;
fi

mongodump --host localhost --port 27017 --out $1 --db $2
