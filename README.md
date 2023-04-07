# MrMat :: Conditional Release Action

A GitHub action to perform a conditional project release the way I like it

## Inputs

### env_version

The environment variable holding the version, used for the tag and release object

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
