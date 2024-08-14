# Publish a new version

```shell
git checkout main
git pull
pnpm version patch
git push
git push origin tag v0.1.x
```
Replace x in the tag with the actual version