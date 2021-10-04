FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source

COPY *.csproj ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet restore -r linux-x64

COPY . .
RUN dotnet publish -c release -o /app -r linux-x64 --self-contained false --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["./sd2376_workshop_backend"]


#FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
#WORKDIR /app
#COPY *.csproj .
#
#RUN dotnet restore -r linux-x64
#
#WORKDIR /app
#RUN dotnet publish -c Release -o publish -r linux-x64 --self-contained false --no-restore
#
#FROM mcr.microsoft.com/dotnet/core/aspnet:5.0 AS runtime
#WORKDIR /app
#COPY --from=build /app/publish ./
#ENTRYPOINT ["./sd2376_workshop_backend"]


#FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
#WORKDIR /app
#EXPOSE 80
#
#FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
#
#WORKDIR /src
#COPY *.csproj ./aspnetapp/
#WORKDIR /src/aspnetapp
#RUN dotnet restore "sd2376_workshop_backend.csproj"
#
#COPY . .
#RUN dotnet build "sd2376_workshop_backend.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "sd2376_workshop_backend.csproj" -c Release -o /app/publish
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "sd2376_workshop_backend.dll"]