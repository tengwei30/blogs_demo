#!/bin/bash
##################
# 创建新页面
# 项目根目录下使用
##################

pathname="./src/views"
template="./src/template/"

echo $template
echo "please input your page name:"
read name
if [ -z $name ]
then
  echo "page name should not be empty"
else
  targetPath="$pathname/$name"
  if [ -d $targetPath ]
  then
    echo "page name exist"
  else
    cp -iR $template $targetPath
    echo "complete!"
  fi
fi