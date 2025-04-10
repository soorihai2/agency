#!/bin/bash

# Create directory if it doesn't exist
mkdir -p static/images/schemes

# Download images
# PMKVY - Computer Training
curl -o static/images/schemes/pmkvy-training.jpg "https://img.freepik.com/free-photo/young-indian-students-learning-computer-skills_23-2149000677.jpg"

# DDU-GKY - Stitching Training
curl -o static/images/schemes/ddu-gky-stitching.jpg "https://img.freepik.com/free-photo/indian-woman-working-with-sewing-machine_23-2149000685.jpg"

# SANKALP - Computer Training
curl -o static/images/schemes/sankalp-computer.jpg "https://img.freepik.com/free-photo/group-indian-students-computer-class_23-2149000681.jpg"

# PMKK - Modern Lab
curl -o static/images/schemes/pmkk-lab.jpg "https://img.freepik.com/free-photo/modern-computer-lab-education-center_23-2149000676.jpg"

# Make the script executable
chmod +x download-images.sh 