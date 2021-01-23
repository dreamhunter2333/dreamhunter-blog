echo "yarn build"
yarn build
echo "copy dist"
cp -r site/.git docs/.vuepress/dist/
rm -rf site
cp -r docs/.vuepress/dist/ ./site/
echo "push dist"
cd site
date=`date +"%Y-%m-%d %H:%M:%S"`
git add --all
git commit -m "update at $date"
git push
