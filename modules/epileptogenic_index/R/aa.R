library(ravedash)
# global variables for the module

# Stores global variables. These are required
module_id <- "epileptogenic_index"
pipeline <- raveio::pipeline(
  pipeline_name = "epileptogenic_index",
  settings_file = "settings.yaml",
  paths = "./modules")
debug <- TRUE

#' Function to check whether data is loaded.
#' @param first_time whether this function is run for the first time
#' @details The function will be called whenever \code{data_changed} event is
#' triggered. This function should only return either \code{TRUE} or
#' \code{FALSE} indicating the check results. If \code{TRUE} is returned,
#' \code{module_html} will be called, and module 'UI' should be displayed.
#' If \code{FALSE} is returned, \code{open_loader} event will be dispatched,
#' resulting in calling function \code{loader_html}.
#' @returns Logical variable of length one.
check_data_loaded <- function(first_time = FALSE){
  # Always use loading screen for the first time
  # Commenting this if statement will skip
  # if(first_time) {
  #   ravedash::fire_rave_event('loader_message', NULL)
  #   return(FALSE)
  # }

  repo_cache_path <- file.path(pipeline$pipeline_path, "shared", "objects", "repository")
  if(file.exists(repo_cache_path)) {
    repo_cache <- raveio::load_yaml(repo_cache_path)
    if( "rave_prepare_subject_voltage_with_epoch" %in% repo_cache$instance_class ) {
      ravedash::fire_rave_event('loader_message', repo_cache$subject)
      return(TRUE)
    }
  }

  ravedash::fire_rave_event('loader_message', NULL)
  return(TRUE)
}



# ----------- Initial configurations -----------

# Change the logger level when `debug` is enabled
if(exists('debug', inherits = FALSE) && isTRUE(get('debug'))){
  ravedash::logger_threshold("trace", module_id = module_id)
} else {
  ravedash::logger_threshold("info", module_id = module_id)
}



