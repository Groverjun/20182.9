//			var _this=this;
//			this.dataImg(_this,this.$refs.logo,function(data){
//				 var image = new Image();
//				 var Maxwidth=w;
//				 var Maxheight=h;
//				 console.log(Maxwidth)
//				 image.onload=function(){
//	                width = image.width;
//	                height = image.height;
//	                if(width<=Maxwidth&&height<=Maxheight){
//	                	_this.headTxt_Img.logo=data;
//						_this.minLogo=data;
//						_this.showFile=false;
//						_this.showFile2=true;
//	                }else{
//	                	alert("请按尺寸上传")
//	                }
//	            };
//	            image.src= data;
//			})

var vm=new Vue({
	el:"#html",
	data:{
		show:true,
		logoImgHide:false,
		minLogo:false,
		showFile:true,
		showFile2:false,
		logo:"images/logo.jpg",
		headTxt_Img:{logo:"images/logo.jpg",txt1:"镀锌带钢管制造产业的龙头企业",txt2:"20年专注镀锌带钢管制造产业，我们更专业！"},
		headtop_txt:{h1:"热销产品推荐",h2:"我们的优势",h3:"成功案例",h4:"荣誉资质"},
		product:[
			{img:"images/b1_list1.jpg",p:"镀锌带方管"},
			{img:"images/b1_list2.jpg",p:"镀锌带圆管"},
			{img:"images/b1_list3.jpg",p:"镀锌带方管"},
			{img:"images/b1_list4.jpg",p:"钢管"},
			{img:"images/b1_list5.jpg",p:"钢管"},
			{img:"images/b1_list6.jpg",p:"钢管"},
		],
		advantage:[
			{
				h1:"强大的生产实力",
				p:"库存充足、保证货期",
				li:[
					"热镀锌带圆管、方管是主导产品，年产量达45万吨;",
					"直缝焊管、热镀锌管、螺旋焊管等产品年销量达65万吨;",
					"产品广泛应用于水暖、大棚、穿线、石油、天然气等;",
				   ],
				img:"images/b2_list1.jpg"
			},
			{
				h1:"完善的检测管理体系",
				p:"保证出厂合格率100%",
				li:[
					"公司总资产2亿元，多名资深的检测人员把控；;",
					"完整的物理和化学性能分析检测并出具相关的检测报告；",
					"保证了热镀锌带管从原料入库到成品出库各个环节安全可靠。",
				   ],
				img:"images/b2_list2.jpg"
			},
			{
				h1:"“客户至上”的服务理念和行动",
				p:"是众多客户选择兆利达的理由",
				li:[
					"只做精品--不接受不良品、不制造不良品、不放行不良品",
					"是多项国家重点工程定点供应单位和多家大型钢铁公司一级经销商 同澳大利亚、加拿大、南美、中东等国家建立贸易关系，构筑起牢 固的世界性经营格局。;",
				   ],
				img:"images/b3_list3.jpg"
			},
		],
		successfulCases:[
			{img:"images/b3_list1.jpg",p:"大棚施工图"},
			{img:"images/b3_list1.jpg",p:"石油管道施工图"},
			{img:"images/b3_list1.jpg",p:"穿线施工图"},
			{img:"images/b3_list1.jpg",p:"防腐工程"},
			{img:"images/b3_list1.jpg",p:"钢管喷漆图"},
			{img:"images/b3_list1.jpg",p:"天然气管道施工图"},
		],
		foot:["images/foot1.jpg","images/foot2.jpg","images/foot3.jpg","images/foot4.jpg"]

	},
	mounted:function(){
		var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: false,
                speed: 600,
                autoplay: 1500,
                observer: true,
				observeParents: true,
				autoplayDisableOnInteraction : false,
                onTouchEnd: function() {
                    swiper.startAutoplay();
                }
            });
	},
	methods:{
		logoImg(){
			if(this.logoImgHide==false){
				this.logoImgHide=true
			}else{
				this.logoImgHide=false
			}
		},
		logoEdlit(){
			var id="#"+this.$refs.logo.id;
			this.dataGo(id,function(img){
				console.log(img)
			})
		},
		calcStyle(index) {
	        var style = {}
	        if (index % 2 !== 0) {
	            style = {float: 'right'}
	        }
	        return style
		 },
		edit(){
			this.show=false
		},
		okedit(ev){
			this.show=true;
		},
		dataGo(id,dataimg){
	    	$(id).fileupload({
	            dataType: 'json',
	            url:"http://192.168.1.159:8081/file/saveImage",
	            maxFileSize: 5000000,
	            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	            add: function (e, data) {
	                data.submit();
	            },
	            done: function (e, response) {
	                var result = response.result;
	                console.log(result)
	                if(result.status==200) {
 						var img=result.data
		                 dataimg(img)
	                }else {
	                    alert(result.msg);
	                }
	            }
	        });
		},
		/*上传图片**/
		dataImg(_this,input_file, get_data){
            if (typeof (FileReader) === 'undefined') {  
                alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");  
            } else {  
                try {  
                    var file = input_file.files[0]; 
                    if(parseInt(file.size/1024/1024)>1){
                    	alert("图片不能大于1M")
                    	 return false;  
                    }
                    if (!/image\/\w+/.test(file.type)) {  
                        alert("请确保文件为图像类型");  
                        return false;  
                    }  
                    var reader = new FileReader();  
                    reader.onload = function () {  
                        get_data(this.result);  
                    }  
                    reader.readAsDataURL(file);  
                } catch (e) {  
                    alert('图片转Base64出错啦！' + e.toString());
                }  
            }					
		}
	},
})