# required library for the module
library(multitaper)
library(pracma)
library(fields)
library(doParallel)
library(parallel)
library(png)
library(signal)

library(reticulate)
library(ggplot2)
library(writexl)
library(readxl)
library(dplyr)

library(rhdf5)

library(signal, warn.conflicts = F, quietly = T) # signal processing functions
library(oce, warn.conflicts = F, quietly = T) # image plotting functions and nice color maps
