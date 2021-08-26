
const root=location.protocol+"//"+location.host
console.log(root)
$('.addCart').click(function(event){
        event.preventDefault()
        const href=this.href
        console.log(href)
        console.log("aaa")
        $.ajax({
            url:href,
            type:'GET',
            data:{},
            success:function(){
              swal("Add successful!", "continute!", "success");
                 $("#infoNumber").load(root+" #numberCart");
            }
          })
    })
    $('.reduceCart').click(function(event){
        event.preventDefault()
        const href=this.href
        const id=this.id
        const qty2="#qty2"+id
        const t2="#t2"+id
        const tr_cart_id= "#tr_cart_"+ id
        console.log("reduce")
        $.ajax({
            url:href,
            type:'GET',
            data:{},
            success:function(){
              swal("Edit successful!", "continute!", "success");
              $("#total1").load(root+"/cart #total2");
              $("#qty"+id).load(root+"/cart "+qty2);
              $("#t1"+id).load(root+"/cart "+t2);
              $("#infoNumber").load(root+"/cart #numberCart");
              if($(qty2).text()==='1'){
                $(tr_cart_id).empty();
              }
            }
          })
    })

    $('.increaseCart').click(function(event){
        event.preventDefault()
        const href=this.href
        const id=this.id
        const qty2="#qty2"+id
        const t2="#t2"+id
        console.log("increase")
        $.ajax({
            url:href,
            type:'GET',
            data:{},
            success:function(){
              swal("icrease 1 successful!", "continute!", "success");
              $("#total1").load(root+"/cart #total2");
              $("#qty"+id).load(root+"/cart "+qty2);
              $("#t1"+id).load(root+"/cart "+t2);

            }
          })
    })
 
    $('.deleteFormCart').on("submit", function(event) {
        event.preventDefault()
        const action = $(this).attr('action')
        const href=root+action
        const tr_cart_id= "#tr_cart_"+ $(this).data("id")
        $.ajax({
            url:href,
            type:'DELETE',
            data:{},
            success:function(){
                swal("Delete successful!", "continute!", "success");
                $("#total1").load(root+"/cart #total2");
                $(tr_cart_id).empty();
                $("#infoNumber").load(root+"/cart #numberCart");
            }
          })
    })

    $('.reduceFormCart').on("submit", function(event) {
      event.preventDefault()
      const action=$(this).attr('action')
        const id=$(this).data("id")
        const qty2="#qty2"+id
        const t2="#t2"+id
        const tr_cart_id= "#tr_cart_"+ id
        $.ajax({
            url:action,
            type:'PUT',
            data:{},
            success:function(){
              swal("Edit successful!", "continute!", "success");
              $("#total1").load(root+"/cart #total2");
              $("#qty"+id).load(root+"/cart "+qty2);
              $("#t1"+id).load(root+"/cart "+t2);
              $("#infoNumber").load(root+"/cart #numberCart");
              if($(qty2).text()==='1'){
                $(tr_cart_id).empty();
              }
            }
          })
    })
    $('.increaseFormCart').on("submit", function(event) {
      event.preventDefault()
      const action=$(this).attr('action')
      const id=$(this).data("id")
      const qty2="#qty2"+id
      const t2="#t2"+id
      $.ajax({
          url:action,
          type:'PUT',
          data:{},
          success:function(){
            swal("Icrease successful!", "continute!", "success");
            $("#total1").load(root+"/cart #total2");
            $("#qty"+id).load(root+"/cart "+qty2);
            $("#t1"+id).load(root+"/cart "+t2);
          }
        })
    })