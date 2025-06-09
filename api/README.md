# API

## Setup

In the VSCode marketplace, install `Spring Boot Extention Pack` and `Extension for Java` extensions.

To setup the environment variables for VSCode editor.

-   From project root create `.vscode` directory and then create `launch.json` file shown below:

```
# launch.json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "java",
			"name": "[DEV] Run",
			"request": "launch",
			"mainClass": "com.smartcart.api.ApiApplication",
			"projectName": "api",
			"args": "",
			"cwd": "${workspaceFolder}/api",
			"env": {
				"DB_NAME": "<your_db_name>",
				"DB_USER": "<your_db_user>",
				"DB_PASSWORD": "<your_db_password>"
			}
		}
	]
}
```

For Intellij, use this [guide](https://www.baeldung.com/intellij-idea-environment-variables).
