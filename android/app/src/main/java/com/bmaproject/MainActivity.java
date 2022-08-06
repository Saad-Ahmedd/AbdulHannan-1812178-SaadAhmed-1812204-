package com.bmaproject;

import android.os.Bundle;        //Ye add kia hai
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BmaProject";
  }

  @Override                                                                         //Hannan Added
  protected void onCreate(Bundle savedInstanceState) {                              //Hannan Added
  super.onCreate(null);                                                             //Hannan Added

}
}
