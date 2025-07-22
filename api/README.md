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
				"DB_URL": "<your_db_url>",
				"DB_USER": "<your_db_user>",
				"DB_PASSWORD": "<your_db_password>"
			}
		}
	]
}
```

If mappers are added/updated, then run `mvn clean compile` to update the target directory.

For Intellij, use this [guide](https://www.baeldung.com/intellij-idea-environment-variables).

## Deploy

-   Project name, `smart-cart-api`, and hosted on [Render](https://render.com/).
-   Configured a `Dockerfile` to deploy the **Spring API** .
-   **Postgresql** is hosted on Render and manually configured using their UI.
-   Point the database to this url: `postgresql://${HOSTNAME}:${PORT}$/${DATABASE}?currentSchema=${SCHEMA_NAME}`
