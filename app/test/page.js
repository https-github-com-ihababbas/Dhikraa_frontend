"use client"



export default function test() {
    var submitAnswer = function (e) {
        e.preventDefault();

        console.log("hi")


        //     var radios = document.getElementsByName('choice');
        //     var val= "";
        //     for (var i = 0, length = radios.length; i < length; i++) {
        //         if (radios[i].checked) {
        //            val = radios[i].value; 
        //            break;
        //          }
        //     }

        //     if (val == "" ) {
        //       alert('please select choice answer');
        //     } else if ( val == "Scripting" ) {
        //       alert('Answer is correct !');
        //     } else {
        //       alert('Answer is wrong');
        //     }
    };

    return (
        <>
            <h1>JavaScript is ______ Language.</h1>
            


            <form onSubmit={submitAnswer}  >
                
                <div className="grid m-1" >
                    <section clasName="w-[30%]">
                        
                    <input type="radio" name="choice" value="Scripting" className="" /> Scripting
                    </section>
                    <section clasName="w-[30%]">
                        
                    <input type="radio" name="choice" value="Programming" /> Programming
                    </section>
                    <section clasName="w-[30%]">
                        
                    <input type="radio" name="choice" value="Application" /> Application
                    </section>
                    <section clasName="w-[30%]">
                        
                    <input type="radio" name="choice" value="None of These" /> None of These
                    </section>
                    <button type="submit" className="px-4 py-2 m-3 ml-10 text-white bg-blue-500 rounded hover:bg-blue-600 w-[30%]">
                        Submit
                    </button>
                </div>



            </form>


        </>
    );
}