window.sheridanQuiz = {
  init: function(){
    quizData = { completed: 0,
                 results: {},
                 maxCount: $('#quiz-slides').data('sequence-count')}

    secondsToCalculate = $('#quiz-slides').data('seconds-to-calculate')
    secondsToRedirect = $('#quiz-slides').data('seconds-to-redirect')
    skipRedirect = $('#quiz-slides').data('skip-redirect') == true

    $('#quiz-slides').slick({
      dots: false,
      arrows: false,
      draggable: false,
      swipe: false,
      autoplay: false,
      infinite: false,
      adaptiveHeight: true,
    });

    sheridanQuiz.initListeners()
  },

  initListeners: function(){
    sheridanQuiz.initStartListener()
    sheridanQuiz.initButtonListener()
    sheridanQuiz.initInputsListener()
  },

  initStartListener: function(){
    $('#start-btn').unbind( "click")
    $('#start-btn').bind( "click", function() {

      // ga('send', 'event', utils.slug(), 'quiz-action', 'quiz-start');

      $('#quiz-slides').slick('slickNext')
      $('#mobile-progress-count').addClass('active')
      $('.progress-bar-container').addClass('active')
      $('.quiz-two-container').addClass('background-1')

      sheridanQuiz.setProgressBar(10)
      return false
    })
  },

  initButtonListener: function(){
    $('.quiz-answer-btn').unbind( "click")
    $('.quiz-answer-btn').on( "click", function() {
      order  = $(this).closest('.quiz-slide').data('order')

      answerData = {questionName: $(this).closest('.quiz-slide').find('.question-prompt').text(),
                    choice: $(this).attr('data-choice-value')}

      sheridanQuiz.advanceQuizFrom(order, $(this).data('go-to-variant'))
      sheridanQuiz.storeQuizResult(order, answerData)
      return false
    })

  },

  initInputsListener: function(){
    $('.input-submit').unbind( "click")
    $('.input-submit').bind( "click", function() {
      order = $(this).closest('.quiz-slide').data('order')
      sheridanQuiz.advanceQuizFrom(order, $(this).prev('input').data('go-to-variant'))
      return false
    })

    $('.answer-text-input').keypress(function (e) {
      if (e.which == 13) {
        order  = $(this).closest('.quiz-slide').data('order')
        sheridanQuiz.advanceQuizFrom(order, $(this).data('go-to-variant'))
        return false;
      }
    });

  },

  setProgressBar: function(percent){
    if(percent == null){
      percent = (quizData.completed / quizData.maxCount) * 100
    }
    $('.progress-bar-inner').css('width', percent + '%')
  },

  advanceQuizFrom: function(fromOrder, variantId){
    quizData.completed = fromOrder
    // ga('send', 'event', 'content', 'quiz-response' , 'q-order:' + fromOrder)
    var nextSequenceNum = order + 1

    if (quizData.completed == quizData.maxCount ){
      $('.quiz-two-container').removeClass('background-' + order)
      $('.quiz-two-container').addClass('background-calc')
      sheridanQuiz.completeQuiz()
    }
    else{

      $('.current-sequence-num').text(nextSequenceNum)
      var $nextSequence = $('.quiz-slide[data-order=' + nextSequenceNum + ']')

      $('.quiz-two-container').removeClass('background-' + order)
      $('.quiz-two-container').addClass('background-' + nextSequenceNum)

      if($nextSequence.data('has-variants') == true){
        $nextSequence.find('.question-container.is-variant' + '[data-variant-id=' + variantId + ']').addClass('active')
      }

      sheridanQuiz.setProgressBar()
      // ga('send', 'event', utils.slug(), 'quiz-action', 'quiz-advance-' + order);
      $('#quiz-slides').slick('slickNext')
    }
    $(window).scrollTop(0)
  },

  storeQuizResult: function(questionOrder, answer){
    quizData.results[questionOrder] = answer

  },

  completeQuiz: function(){
    $('#quiz-slides').removeClass('active')
    $('.progress-bar-container').removeClass('active')
    $('#mobile-progress-count').removeClass('active')
    $('#quiz-calculating').addClass('active')
    // ga('send', 'event', utils.slug(), 'quiz-action', 'quiz-complete');

    setTimeout(function(){
      $('#quiz-calculating').removeClass('active')
      sheridanQuiz.dynamicCompleteContent()
      $('#quiz-complete').addClass('active')

      // change background class
      $('.quiz-two-container').removeClass('background-calc')
      $('.quiz-two-container').addClass('background-complete')
      sheridanQuiz.setRedirect()
    }, secondsToCalculate * 1000);
  },


  setRedirect: function(){
    if(skipRedirect || secondsToRedirect == 0){
      return true
    }
    var counter = secondsToRedirect
    setInterval(function() {
      counter--
      $('#redirecting-in-seconds').text(counter)
      if(counter == 0){
        window.location.href = $('#quiz-slides').data('redirect-location');
      }
    }, 1000);
  },

  mode: function(results){
    // this can be used to calculate the most selected answer
    var counts = {};
    var compare = -1;
    var mostFrequent;
    for(var i = 0, len = results.length; i < len; i++){
        var word = results[i];

        if(counts[word] === undefined){
            counts[word] = 1;
        }else{
            counts[word] = counts[word] + 1;
        }
        if(counts[word] > compare){
              compare = counts[word];
              mostFrequent = results[i];
        }
     }
   return mostFrequent;
 },

 dynamicCompleteContent: function(){
   // render dynamic completed content
 }

}
