import React from 'react';

export const Header = () => (
    <>
      <header
        class="
            relative
            text-white h-[40px] bg-[#3b3b3b] 
            flex gap-[5px] items-center justify-between p-[5px] 
            box-border border-[#4b4b4b] border-b
        "
        role="disabled"
      >
          <section class="header__left min-w-[140px] flex gap-[5px] items-center">
              <ion-icon
                  name="apps"
                  class="
                      hover:bg-[#4F4F4F] border border-y-0 border-x-0 
                      text-white cursor-[pointer]
                      text-[16px]
                      p-[8px_10px]
                  "
                  title="Append Element" 
              ></ion-icon>

              <hr class="h-[15px] border border-l-[1px] border-[#6b6b6b]" />

              <ion-icon
                  name="send"
                  class="
                      hover:bg-[#4F4F4F] border border-y-0 border-x-0 
                      text-white cursor-[pointer]
                      text-[16px]
                      p-[8px_10px]
                  "
                  title="Add contacts" 
              ></ion-icon>

              <ion-icon
                  name="save"
                  class="
                      hover:bg-[#4F4F4F] border border-y-0 border-x-0 
                      text-white cursor-[pointer]
                      text-[16px]
                      p-[8px_10px]
                  "
                  title="Save changes" 
              ></ion-icon>
          </section>

          <section class="header__center min-w-[140px] flex items-center justify-center gap-[5px]">
              <ion-icon
                  name="add"
                  class="
                      hover:bg-[#4F4F4F] border border-y-0 border-x-0 
                      text-white cursor-[pointer]
                      text-[16px]
                      p-[8px_10px]
                  "
                  title="Zoom in"
              ></ion-icon>
              <input
                  class="
                      bg-transparent outline-1 rounded w-[50px] text-xs p-1 
                      text-center text-[gray] focus:text-[white]
                  "
                  value="100%"
              />
              <ion-icon
                  name="remove"
                  class="
                      hover:bg-[#4F4F4F] border border-y-0 border-x-0 
                      text-white cursor-[pointer]
                      text-[16px]
                      p-[8px_10px]
                  "
                  title="Zoom out" 
              ></ion-icon>
          </section>

          <section class="header__right min-w-[140px] flex items-center justify-end gap-[5px]">
              <ion-icon
                  name="person"
                  class="
                    hover:bg-[#4F4F4F] border border-y-0 border-x-0 
                    text-white cursor-[pointer]
                    text-[16px]
                    p-[8px_10px]
                  "
                  title="Login" 
              ></ion-icon>
          </section>
      </header>
      <div 
        class="
          subheader bg-[#3d3d3d] h-[35px] w-[100%] absolute
          flex gap-[5px] items-center justify-between p-[5px] 
          box-border border-[#4b4b4b] border-b text-white
        "
      >
        <ion-icon 
          draggable="true"
          id="add__textbox"
          name="text-outline"
          class="
            hover:bg-[#4F4F4F] border border-y-0 border-x-0 
            text-white cursor-[pointer]
            text-[16px]
            p-[8px_10px]
          "
          title="Add Textbox" 
        ></ion-icon>
      </div>
    </>
);