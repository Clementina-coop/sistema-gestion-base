#!/bin/bash
argcount=1
function showHelp {
        echo "uso: ./utils/restore.sh ORIGEN_DEL_BACKUP"
        echo "ejemplo: ./utils/restore.sh data"
}

if [ "$#" -ne $argcount ]; then
    echo "Illegal number of parameters"
    showHelp;
    exit 1;
fi

mongorestore --host localhost --port 27017 --drop $1
