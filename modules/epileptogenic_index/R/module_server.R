
module_server <- function(input, output, session, ...){


  # Local reactive values, used to store reactive event triggers
  local_reactives <- shiny::reactiveValues(
    update_outputs = NULL
  )


  # Local non-reactive values, used to store static variables
  local_data <- dipsaus::fastmap2()

  # get server tools to tweek
  server_tools <- get_default_handlers(session = session)


  # This function only cares about running the energy ratio matrix
  # Do not put plotting or analysis configurations here
  run_er <- function(target_names = c("ER_matrix"),
                             with_notification = TRUE, ...) {
    # SOZ_string: 12-13,17-21,25-29,31,33-37,39,42-43,51-52
    # num_windows: 100
    # epoch: sz2
    # time_window:
    #   - -60


    # label_input <- "numeric"
    # if (input$hm_label == TRUE) {
    #   label_input <- "names"
    # } else {
    #   label_input <- "numeric"
    # }

    # stores the multitaper results
    local_data$results <- NULL

    # local_data$SOZ_elec <- input$input_SOZ_electrodes
    # local_data$plot_SOZ_elec <- input$hm_showSOZ
    # local_data$label_type <- label_input

    ravedash::logger("Scheduled: ", pipeline$pipeline_name, level = 'debug', reset_timer = TRUE)

    if( with_notification ) {
      dipsaus::shiny_alert2(
        title = "Calculating in progress",
        text = ravedash::be_patient_text(),
        icon = "info",
        danger_mode = FALSE,
        auto_close = FALSE,
        buttons = FALSE,
        session = session
      )
    }


    res <- tryCatch(
      {

        shidashi::clear_notifications(class = "pipeline-error")

        results <- pipeline$run(
          as_promise = FALSE,
          scheduler = "none",
          type = "callr",
          # shortcut = TRUE,
          names = target_names,
          ...
        )

        # Run everything necessary to get the ER_matrix
        er_result <- pipeline$read("ER_matrix")


        local_data$results <- list(
          er_result = er_result
        )

        if( with_notification ) {
          ravedash::logger("Fulfilled: ", pipeline$pipeline_name,
                           level = 'debug')
        }
        local_reactives$update_outputs <- Sys.time()
        TRUE
      },
      error = function(e) {
        msg <- paste(e$message, collapse = "\n")
        if(inherits(e, "error")){
          ravedash::logger(msg, level = 'error')
          ravedash::logger(traceback(e), level = 'error', .sep = "\n")
          shidashi::show_notification(
            message = msg,
            title = "Error while running pipeline", type = "danger",
            autohide = FALSE, close = TRUE, class = "pipeline-error"
          )
          shidashi::card_operate(
            title = "Energy Ratio Parameters",
            method = "expand"
          )
        }
        e
      }
    )

    if( with_notification ) {
      Sys.sleep(0.5)
      dipsaus::close_alert2()
    }
    return( res )
  }

  run_analysis <- function() {
    output_flags <- local_reactives$update_outputs
    if (!length(output_flags) ||
        isFALSE(output_flags) || !is.list(local_data$results)) {
      run_er()
    }
    pipeline$set_settings(
      condition = input$condition,
    )

    local_reactives$update_outputs <- Sys.time()
  }

  shiny::bindEvent(
    ravedash::safe_observe({
      loaded_flag <- ravedash::watch_data_loaded()
      if (!loaded_flag) {
        return()
      }

      run_analysis()

    }, error_wrapper = "alert"),
    server_tools$run_analysis_flag(),
    ignoreNULL = TRUE,
    ignoreInit = TRUE
  )

  # Listening to "run multitaper" button
  shiny::bindEvent(
    ravedash::safe_observe({
      run_er()

    }, error_wrapper = "alert"),
    input$run_er_matrix,
    ignoreNULL = TRUE,
    ignoreInit = TRUE
  )

  # ---- Output renderers: BEGIN ------------------------------------------

  ravedash::register_output(
    outputId = "er_plot",
    output_type = "image",
    title = "Download energy ratio over time plot",
    shiny::renderPlot({
      shiny::validate(shiny::need(
        length(local_reactives$update_outputs) &&
          !isFALSE(local_reactives$update_outputs),
        message = "Please run the module first."
      ))

      shiny::validate(
        shiny::need(isTRUE(is.list(
          local_data$results
        )) &&
          isTRUE(
            is.list(local_data$results$heatmap_result)
          ), message = "No heatmap data. Please check analysis options.")
      )

      # Need to add in logic for reading in soz and resect electrodes
      # Need to add in ML predictions
      # soz_electrodes <- get_soz_electrodes()
      # resect_electrodes <- get_resect_electrodes()
      # heatmap_name_type <- ifelse(isTRUE(input$hm_label), "name", "number")
      # ordered <- ordered_electrodes()
      # ML_prediction_electrode <- local_data$results$ML_result
      # if (length(ML_prediction_electrode) == 0) {
      #   ML_prediction_electrode <- rep(FALSE, length(pipeline$get_settings()$load_electrodes))
      # }
      #
      # plot_energy_ratio(
      #   repository = component_container$data$repository,
      #   load_electrodes = pipeline$get_settings()$load_electrodes,
      #   subject = pipeline$get_settings()$subject,
      #   condition = input$condition,
      #   time_windows = pipeline$get_settings()$time_window,
      #   reference = pipeline$get_settings()$reference_name,
      #   analysis_time_frequencies = pipeline$get_settings()$analysis_time_frequencies,
      #   soz_electrodes = soz_electrodes,
      #   resect_electrodes = resect_electrodes,
      #   ordered = ordered,
      #   name_type = heatmap_name_type,
      #   show_ML = input$ml_checkbox
      # )

    })
  )

}
