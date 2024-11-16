

module_html <- function() {
  current_inputs <- pipeline$get_settings()

  shiny::fluidPage(shiny::fluidRow(
    shiny::column(
      width = 3L,
      shiny::div(# class = "row fancy-scroll-y stretch-inner-height",
        class = "row screen-height overflow-y-scroll", shiny::column(
          width = 12L,

          ravedash::input_card(
            title = "Energy Ratio",

            ravedash::flex_group_box(
              title = "Basic",

              shidashi::flex_item(
                shiny::textInput(
                  inputId = ns("input_SOZ_electrodes"),
                  label = "SOZ electrodes",
                  value = "",
                  placeholder = "e.g. 1-10,56,58-60"
                )
              ),

              dipsaus::actionButtonStyled(
                inputId = ns("run_er_matrix"),
                label = "Run Energy Ratio",
                width = "100%"
              )
            )
          )
        ))
    )
  ))
}
