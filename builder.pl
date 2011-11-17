#!/usr/bin/perl

use Mojolicious::Lite;
use YAML qw/LoadFile/;
use JavaScript::Minifier qw/minify/;

my $projects_dir = "./projects";

get "/get_code_from/:proj_name" => sub {
   my $self = shift;
   my $proj = $self->param("proj_name");
   app->log->debug("Param: $proj");
   $self->render(text => $self->get_all_code($proj));
};

helper get_project_code => sub {
   my $self = shift;
   my $proj = shift;

   my $code;
   for my $file($self->get_project_files($proj)) {
      $code .= $self->get_code($proj, $file);
   }
   $code
};

helper get_all_code => sub{
   my $self = shift;
   my $proj = shift;

   my @projs = $self->get_dependency_list($proj);
   app->log->debug(@projs);

   my $code;
   for my $dproj($self->get_dependency_list($proj)) {
      for my $pfile ($self->get_project_files($dproj)) {
         $code .= $self->get_code($dproj, $pfile);
      }
   }
   for my $pfile ($self->get_project_files($proj)) {
      $code .= $self->get_code($proj, $pfile);
   }
   $code;
};

helper get_code => sub{
   my $self    = shift;
   my $project = shift;
   my $file    = shift;

   app->log->debug("getting code from: proj: $project; file: $file");

   my $pdir = $self->get_project_dir($project);
   app->log->debug("debug: $pdir");
   open(my $fh, "<", "$pdir/$file") || die "File '$pdir/$file' not found.";
   minify(input => $fh, copyright => "${project}::$file")
};

helper get_dependency_list => sub{
   my $self = shift;
   my $proj = shift;

   my @dep;
   if(exists $self->get_project_details($proj)->{depends} and ref $self->get_project_details($proj)->{depends} eq "ARRAY") {
      my @primary_dep = @{ $self->get_project_details($proj)->{depends} };
      my %udep = map {($_ => 1)} @primary_dep;
      for my $sub_dep(@primary_dep) {
         for my $d($self->get_dependency_list($sub_dep)){
            push @dep, $d if not exists $udep{$d};
            $udep{$d}++;
         }
      }
      push @dep, @primary_dep;
   }
   @dep
};

helper get_project_files => sub {
   my $self    = shift;
   my $project = shift;

   @{ $self->get_project_details($project)->{files} };
};

helper get_project_dir => sub {
   my $self    = shift;
   my $project = shift;

   app->log->debug("$projects_dir/$project");
   "$projects_dir/$project";
};

helper get_project_details => sub{
   my $self = shift;
   my $name = shift;

   LoadFile("$projects_dir/$name/project.yaml");
};

app->start;
