# Api Documentation


### Environment variables
You are supposed to set up a __.env__ file at the root of this project. That file's gonna be used 
to configure your database among other stuff. Here it is an example of such a file. Don't forget to change
those default configurations. Optionally, you can simply define them on the _docker-compose.yml_ file.

```bash
DATABASE_URL: postgresql://postgres:1234@db:5432/goreads?schema=public
JWT_SECRET: jwt_secret
```

--- 

### How to generate api route docs.
You can easily generate your api route docs. First of all, inside this folder, run the command below, make sure you've got
npx installed on your machine.

```bash
npx insomnia-documenter --config ./api-doc.json
```

Then, you can run a server with your brand new doc by using:
```bash
npx serve
```

Now it's as simple as opening a new tab on your favourite browser and access the link:
> http://localhost:3000
