# MrMat :: Conditional Release Action

A GitHub action to perform a conditional project release the way I like it

## Inputs

### token

**Required** The token to use for authenticating to the GitHub API

### version

**Required** The version to release

### title

**Required** The release title

## Outputs

None

## Example usage

```yaml
uses: actions/mrmat-conditional-release-action@v1
with:
  title: "Release ${{ env.MRMAT_VERSION }}"
```
