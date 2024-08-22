namespace SteeringMariaMaui;


public partial class BaseSettingPage : ContentPage
{
	
	public BaseSettingPage()
	{
		InitializeComponent();
		if (Preferences.Default.ContainsKey("baseurl")) {
			BaseUrl.Text=Preferences.Default.Get("baseurl","");
		}
	}

	private void OnEntryTextChanged(object sender, EventArgs e)
	{
	
	}

	private void OnEntryCompleted(object sender, EventArgs e){
        Preferences.Default.Set("baseurl",((Entry)sender).Text);
	}
}

