#!/bin/bash
# System Health Monitor for Library App
# This script checks and restarts services automatically

LOG_FILE="/var/log/library-app-monitor.log"

log_message() {
    echo "$(date): $1" >> $LOG_FILE
}

check_and_restart_docker() {
    if ! systemctl is-active --quiet docker; then
        log_message "Docker service down - restarting"
        sudo systemctl start docker
        sleep 10
    fi
}

check_and_restart_containers() {
    cd /opt/library_app
    
    # Check if containers are running
    if ! docker-compose ps | grep -q "Up"; then
        log_message "Containers not running - restarting"
        docker-compose down
        docker-compose pull
        docker-compose up -d
    fi
}

check_app_health() {
    # Check frontend
    if ! curl -f -s http://localhost:3000 > /dev/null; then
        log_message "Frontend unhealthy - restarting containers"
        cd /opt/library_app && docker-compose restart frontend
    fi
    
    # Check backend
    if ! curl -f -s http://localhost:5001 > /dev/null; then
        log_message "Backend unhealthy - restarting containers"
        cd /opt/library_app && docker-compose restart backend
    fi
}

# Main monitoring loop
log_message "Starting health check"
check_and_restart_docker
check_and_restart_containers
sleep 30
check_app_health
log_message "Health check completed"