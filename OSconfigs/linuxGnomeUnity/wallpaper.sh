#auto wallPaper setup
wget -O ./wallP "http://localhost:8080/" #"https://arshwaraich.com/wallpaper";
gsettings set org.gnome.desktop.background picture-uri file://$PWD/wallP