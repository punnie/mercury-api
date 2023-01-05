
{
  description = "Mercury API flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        mercuryApiPackage = pkgs.mkYarnPackage {
          name = "mercury-api";
          src = self;
          packageJSON = "${self}/package.json";
          yarnLock = "${self}/yarn.lock";
        };


        dockerImage = pkgs.dockerTools.buildImage {
          name = "mercury-api";
          tag = "latest";
          created = "now";

          config = {
            Cmd = [
              "${mercuryApiPackage}/bin/mercury-api"
            ];
          };
        };
      in {
        packages = {
          mercury-api = mercuryApiPackage;
          docker = dockerImage;
        };

        packages.default = dockerImage;

        overlays.default = (final: prev: {
          mercury-api = mercuryApiPackage;
          mercury-api-docker-image = dockerImage;
        });
      });
}
