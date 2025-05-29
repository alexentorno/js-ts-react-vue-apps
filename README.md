## Javascript and Web Applications with C# repository  

Alexander Pekhenko  

2024 Spring

## Useful commands in .net console CLI

Install tooling

~~~bash
dotnet tool update -g dotnet-ef
dotnet tool update -g dotnet-aspnet-codegenerator
~~~

## EF Core migrations

~~~bash
dotnet ef migrations --project App.DAL.EF --startup-project WebApp add Initial
dotnet ef database --project App.DAL.EF --startup-project WebApp update
dotnet ef database --project App.DAL.EF --startup-project WebApp drop
~~~

## MVC controllers

Install from nuget:
- Microsoft.VisualStudio.Web.CodeGeneration.Design
- Microsoft.EntityFrameworkCore.SqlServer


Run from WebApp folder!

~~~bash
cd WebApp

dotnet aspnet-codegenerator controller -name ContestsController        -actions -m  App.Domain.Contest        -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
# use area
dotnet aspnet-codegenerator controller -name ContestsController        -actions -m  App.Domain.Contest        -dc AppDbContext -outDir Areas/Admin/Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f

cd ..
~~~

3f9c0db6-32ae-4151-b721-4ea591001a68
8c33745e-db4f-4664-8db0-181f4b474b44
